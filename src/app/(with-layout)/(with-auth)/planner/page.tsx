'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../../amplify/data/resource';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const client = generateClient<Schema>();

type GardenItem = {
  id: string;
  name: string;
  type?: string | null;
};

type PlantingPlanItem = {
  id: string;
  gardenId?: string | null;
  name: string;
  season?: string | null;
  year?: number | null;
};

type PlanStepItem = {
  id: string;
  stepNumber: number;
  actionType: string;
  title: string;
  description?: string | null;
  effectiveDate?: string | null;
  status?: string | null;
};

type TaskItem = {
  id: string;
  title: string;
  taskType: string;
  dueDate?: string | null;
  status: string;
  priority: string;
};

export default function PlannerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [gardens, setGardens] = useState<GardenItem[]>([]);
  const [plans, setPlans] = useState<PlantingPlanItem[]>([]);
  const [steps, setSteps] = useState<PlanStepItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const [selectedGardenId, setSelectedGardenId] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  const loadGardens = React.useCallback(async () => {
    const query = `
      query ListGardens($limit: Int) {
        listGardens(limit: $limit) {
          items {
            id
            name
            type
          }
        }
      }
    `;

    const result = await client.graphql({ query, variables: { limit: 100 } }) as {
      data?: { listGardens?: { items?: GardenItem[] | null } };
      errors?: Array<{ message?: string }>;
    };

    if (result.errors?.length) {
      throw new Error(result.errors.map((error) => error.message ?? 'Unknown error').join('; '));
    }

    const gardenItems = result.data?.listGardens?.items ?? [];
    setGardens(gardenItems);

    if (gardenItems.length > 0) {
      setSelectedGardenId((current) => (current ? current : gardenItems[0].id));
    }
  }, []);

  const loadPlans = async (gardenId: string) => {
    if (!gardenId) {
      setPlans([]);
      setSelectedPlanId('');
      return;
    }

    const query = `
      query ListPlantingPlans($filter: ModelPlantingPlanFilterInput, $limit: Int) {
        listPlantingPlans(filter: $filter, limit: $limit) {
          items {
            id
            gardenId
            name
            season
            year
          }
        }
      }
    `;

    const result = await client.graphql({
      query,
      variables: {
        filter: {
          gardenId: { eq: gardenId },
        },
        limit: 100,
      },
    }) as {
      data?: { listPlantingPlans?: { items?: PlantingPlanItem[] | null } };
      errors?: Array<{ message?: string }>;
    };

    if (result.errors?.length) {
      throw new Error(result.errors.map((error) => error.message ?? 'Unknown error').join('; '));
    }

    const planItems = result.data?.listPlantingPlans?.items ?? [];
    setPlans(planItems);

    if (planItems.length > 0) {
      setSelectedPlanId((current) => (current ? current : planItems[0].id));
    } else {
      setSelectedPlanId('');
      setSteps([]);
      setSelectedStepIndex(0);
    }
  };

  const loadPlanSteps = async (planId: string) => {
    if (!planId) {
      setSteps([]);
      setSelectedStepIndex(0);
      return;
    }

    const query = `
      query ListPlanSteps($filter: ModelPlanStepFilterInput, $limit: Int) {
        listPlanSteps(filter: $filter, limit: $limit) {
          items {
            id
            stepNumber
            actionType
            title
            description
            effectiveDate
            status
          }
        }
      }
    `;

    const result = await client.graphql({
      query,
      variables: {
        filter: {
          plantingPlanId: { eq: planId },
        },
        limit: 500,
      },
    }) as {
      data?: { listPlanSteps?: { items?: PlanStepItem[] | null } };
      errors?: Array<{ message?: string }>;
    };

    if (result.errors?.length) {
      throw new Error(result.errors.map((error) => error.message ?? 'Unknown error').join('; '));
    }

    const stepItems = (result.data?.listPlanSteps?.items ?? []).sort((left, right) => left.stepNumber - right.stepNumber);
    setSteps(stepItems);
    setSelectedStepIndex(0);
  };

  const loadTasks = async (gardenId: string) => {
    if (!gardenId) {
      setTasks([]);
      return;
    }

    const query = `
      query ListTasks($filter: ModelTaskFilterInput, $limit: Int) {
        listTasks(filter: $filter, limit: $limit) {
          items {
            id
            title
            taskType
            dueDate
            status
            priority
          }
        }
      }
    `;

    const result = await client.graphql({
      query,
      variables: {
        filter: {
          gardenId: { eq: gardenId },
        },
        limit: 200,
      },
    }) as {
      data?: { listTasks?: { items?: TaskItem[] | null } };
      errors?: Array<{ message?: string }>;
    };

    if (result.errors?.length) {
      throw new Error(result.errors.map((error) => error.message ?? 'Unknown error').join('; '));
    }

    setTasks(result.data?.listTasks?.items ?? []);
  };

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        await loadGardens();
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load gardens.');
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!selectedGardenId) return;
      try {
        await Promise.all([loadPlans(selectedGardenId), loadTasks(selectedGardenId)]);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load garden plan data.');
      }
    };

    run();
  }, [selectedGardenId]);

  useEffect(() => {
    const run = async () => {
      if (!selectedPlanId) return;
      try {
        await loadPlanSteps(selectedPlanId);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load plan steps.');
      }
    };

    run();
  }, [selectedPlanId]);

  const selectedStep = steps[selectedStepIndex];

  const taskSummary = useMemo(() => {
    return tasks.reduce(
      (accumulator, task) => {
        if (task.status === 'completed') accumulator.completed += 1;
        else accumulator.pending += 1;
        return accumulator;
      },
      { completed: 0, pending: 0 }
    );
  }, [tasks]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-slate-500">Planner</p>
          <h1 className="text-3xl font-semibold text-slate-900">Garden Plan Preview</h1>
          <p className="text-slate-600">
            Review your plan steps and visualize what the garden should look like as the season progresses.
          </p>
        </div>

        {errorMessage && (
          <Card className="p-4 border border-red-200 bg-red-50 text-red-700">{errorMessage}</Card>
        )}

        <Card className="p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Garden</label>
              <select
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                value={selectedGardenId}
                onChange={(event) => setSelectedGardenId(event.target.value)}
                disabled={isLoading || gardens.length === 0}
              >
                {gardens.map((garden) => (
                  <option key={garden.id} value={garden.id}>
                    {garden.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Plan</label>
              <select
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
                value={selectedPlanId}
                onChange={(event) => setSelectedPlanId(event.target.value)}
                disabled={plans.length === 0}
              >
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} {plan.season ? `(${plan.season} ${plan.year ?? ''})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Step Timeline Preview</h2>
              <span className="text-sm text-slate-500">{steps.length} steps</span>
            </div>

            {steps.length > 0 ? (
              <>
                <Input
                  type="range"
                  min={0}
                  max={Math.max(0, steps.length - 1)}
                  value={selectedStepIndex}
                  onChange={(event) => setSelectedStepIndex(Number(event.target.value))}
                />

                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Step {selectedStep?.stepNumber}</p>
                      <h3 className="font-semibold text-slate-900">{selectedStep?.title}</h3>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                      {selectedStep?.actionType}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{selectedStep?.description || 'No description yet.'}</p>
                  <p className="text-xs text-slate-500">
                    {selectedStep?.effectiveDate ? `Scheduled: ${selectedStep.effectiveDate}` : 'No date scheduled'}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-green-50 to-emerald-100 p-4">
                  <p className="text-sm font-medium text-slate-700 mb-3">Visual stage (MVP)</p>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 12 }).map((_, index) => {
                      const isActive = index <= selectedStepIndex;
                      return (
                        <div
                          key={index}
                          className={`h-12 rounded-md border ${isActive ? 'bg-emerald-400 border-emerald-500' : 'bg-slate-100 border-slate-200'}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
                No plan steps found for this plan yet.
              </div>
            )}
          </Card>

          <Card className="p-5 space-y-4">
            <h2 className="text-lg font-semibold">Task List</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-md bg-slate-100 p-2">Pending: {taskSummary.pending}</div>
              <div className="rounded-md bg-slate-100 p-2">Completed: {taskSummary.completed}</div>
            </div>

            <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task.id} className="rounded-md border border-slate-200 p-3">
                    <p className="font-medium text-slate-800 text-sm">{task.title}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {task.taskType} · {task.priority} · {task.status}
                    </p>
                    {task.dueDate && <p className="text-xs text-slate-500">Due {task.dueDate}</p>}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No tasks for this garden yet.</p>
              )}
            </div>

            <Button className="w-full" onClick={() => window.location.assign('/chat')}>Refine plan in chat</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
