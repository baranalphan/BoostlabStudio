/**
 * WebMCP (https://webmachinelearning.github.io/webmcp/): browsers with an AI agent built in
 * expose `navigator.modelContext`, where a page can register tools the agent may call.
 * Only the parts the site uses are typed; every browser without it leaves this undefined.
 */

type ModelContextToolResult = { content: { type: "text"; text: string }[] };

type ModelContextTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<ModelContextToolResult>;
};

interface Navigator {
  modelContext?: {
    registerTool?: (tool: ModelContextTool, options?: { signal?: AbortSignal }) => unknown;
    unregisterTool?: (name: string) => void;
  };
}

/* The declarative form of WebMCP: a form annotated with these becomes a tool. */
declare namespace React {
  // `T` must match React's own declaration for the interfaces to merge.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
  }
}
