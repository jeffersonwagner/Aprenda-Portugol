interface CodeBlockProps {
  code: string;
  className?: string;
}

export default function CodeBlock({ code, className = "" }: CodeBlockProps) {
  return (
    <pre
      className={`overflow-x-auto rounded-xl bg-slate-800 px-4 py-3 text-left font-mono text-sm text-slate-100 ${className}`}
    >
      <code>{code}</code>
    </pre>
  );
}
