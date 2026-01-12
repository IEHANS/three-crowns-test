type Props = {
  onOpenLog: () => void;
};

export default function WidgetTray({ onOpenLog }: Props) {
  return (
    <div>
      <button onClick={onOpenLog}>
        📜 로그 열기
      </button>
    </div>
  );
}
