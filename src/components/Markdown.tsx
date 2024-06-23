type Props = {
  children: string
}
import ReactMarkdown from 'react-markdown'

export default function Markdown({ children }: Props) {
  return (
    <ReactMarkdown
      className={`space-y-3`}
      components={{
        ul: (props) => <ul {...props} className="list-inside list-disc" />,
        a: (props) => <a {...props} className="text-emerald-500 underline" />,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
