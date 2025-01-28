"use client"
import React, { useEffect, useState } from 'react';
import { stringify } from 'yaml';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";
const amplifyClient = generateClient<Schema>();

function Page({
    params,
}: {
    params: Promise<{ gardenId: string }>
}) {
    // console.log('params: ', params)
    // console.log('gardenId: ', (params).gardenId)
    // const gardenId = (await params).gardenId
    // const gardenId = "c658970d-3097-42e6-9c8e-a6d3ac9fdef7"
    const [activeGarden, setActiveGarden] = useState<Schema["Garden"]["createType"]>();
    const [plannedSteps, setPlannedSteps] = useState<Array<Schema["PlannedStep"]["createType"]>>();
    const [pastSteps, setPastSteps] = useState<Array<Schema["PastStep"]["createType"]>>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const gardenSubscriptionHandler = async () => {
            const gardenId = (await params).gardenId
            if (gardenId) {
                const gardenSub = amplifyClient.models.Garden.observeQuery({
                    filter: {
                        id: { eq: gardenId }
                    }
                }).subscribe({
                    next: ({ items, isSynced }) => {
                        setActiveGarden(items[0])
                    }
                })

                const plannedStepsSub = amplifyClient.models.PlannedStep.observeQuery({
                    filter: {
                        gardenId: { eq: gardenId }
                    }
                }).subscribe({
                    next: ({ items, isSynced }) => {
                        setPlannedSteps(items)
                        console.log('plannedSteps: ', items)
                    }
                })
    
                return () => {
                    gardenSub.unsubscribe(),
                    plannedStepsSub.unsubscribe()
                };
            }
        }

        gardenSubscriptionHandler()
        
    }, [params])


    return (
        <div>
            <pre>{JSON.stringify(activeGarden, null, 2)}</pre>
            <pre>{JSON.stringify(plannedSteps,null,2)}</pre>
        </div>
    );
}

export default Page;