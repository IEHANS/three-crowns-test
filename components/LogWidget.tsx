export default function LogWidget({
  logs,
  onClose,
}: {
  logs: string[];
  onClose: () => void;
}) {
  return (
    <div className="fixed right-4 top-4 w-80 bg-zinc-800 p-4 rounded shadow-xl z-50">
      <h2 className="font-bold mb-3">📖 전체 로그</h2>

      <ul className="text-sm text-zinc-300 space-y-1 max-h-64 overflow-y-auto">
        {logs.map((log, i) => (
          <li key={i}>• {log}</li>
        ))}
      </ul>

      <button
        className="mt-4 w-full text-sm text-zinc-400"
        onClick={onClose}
      >
        닫기
      </button>
    </div>
  );
}
