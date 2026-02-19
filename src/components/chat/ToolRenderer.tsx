'use client';

import type { ToolUIPart } from 'ai';
import { ReactNode } from 'react';

export interface ToolRendererContext {
  toolPart: ToolUIPart;
  messageId: string;
  partIndex: number;
  chatSessionId: string;
}

export type ToolRendererFunction = (context: ToolRendererContext) => ReactNode | null;

/**
 * Registry for custom tool UI renderers.
 * 
 * This allows you to register custom UI components for specific tools
 * instead of rendering the default tool UI.
 * 
 * Example usage:
 * ```tsx
 * // In a separate file or at app initialization
 * ToolRenderer.register('tool-draft-work-order', ({ toolPart, messageId }) => {
 *   return <WorkOrderDraft data={toolPart.input} />;
 * });
 * 
 * // To hide a tool from the UI
 * ToolRenderer.register('tool-generate_suggestions', () => null);
 * ```
 */
export class ToolRenderer {
  private static renderers = new Map<string, ToolRendererFunction>();

  /**
   * Register a custom renderer for a specific tool type
   */
  static register(toolType: string, renderer: ToolRendererFunction): void {
    this.renderers.set(toolType, renderer);
  }

  /**
   * Unregister a custom renderer
   */
  static unregister(toolType: string): void {
    this.renderers.delete(toolType);
  }

  /**
   * Get the renderer for a specific tool type
   */
  static getRenderer(toolType: string): ToolRendererFunction | undefined {
    return this.renderers.get(toolType);
  }

  /**
   * Check if a custom renderer exists for a tool type
   */
  static hasRenderer(toolType: string): boolean {
    return this.renderers.has(toolType);
  }

  /**
   * Clear all registered renderers
   */
  static clear(): void {
    this.renderers.clear();
  }
}

// Register default hidden tools
ToolRenderer.register('tool-generate_suggestions', () => null);
