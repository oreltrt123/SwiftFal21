import { useEffect, useMemo } from 'react';
import { IconButton } from '~/components/ui/IconButton';
import { useMCPStore } from '~/lib/stores/mcp';

interface McpToolsProps {
  onOpenPanel: () => void;
}

export function McpTools({ onOpenPanel }: McpToolsProps) {
  const isInitialized = useMCPStore((state) => state.isInitialized);
  const serverTools = useMCPStore((state) => state.serverTools);
  const initialize = useMCPStore((state) => state.initialize);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  const serverEntries = useMemo(() => Object.entries(serverTools), [serverTools]);
  const availableServersCount = useMemo(
    () => serverEntries.filter(([, server]) => server.status === 'available').length,
    [serverEntries],
  );

  return (
    <div className="relative">
      <IconButton
        onClick={onOpenPanel}
        title={`Integrations${availableServersCount > 0 ? ` (${availableServersCount} available)` : ''}`}
        disabled={!isInitialized}
        className="transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bolt-elements-item-backgroundAccent/50 rounded-lg"
      >
        {!isInitialized ? (
          <div className="i-svg-spinners:90-ring-with-bg text-bolt-elements-loader-progress text-lg animate-spin"></div>
        ) : (
          <div className="relative">
            <div className="i-ph:plug text-lg"></div>
            {availableServersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-bolt-elements-background-depth-1"></span>
            )}
          </div>
        )}
      </IconButton>
    </div>
  );
}
