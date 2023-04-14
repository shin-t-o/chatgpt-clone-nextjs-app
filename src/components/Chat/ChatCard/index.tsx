import { Card, CardContent, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { baseFont } from '@/constant/style'
import { formatTime } from '@/utils/formatTime'
import { FirebaseMessage } from '@/type'

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return <code className={className}>{children}</code>
  }
  const match = /language-(\w+)/.exec(className || '')
  const lang = match && match[1] ? match[1] : ''
  return (
    <SyntaxHighlighter style={a11yDark} language={lang}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}

export const ChatCard = ({ message: m }: { message: FirebaseMessage }) => {
  const cardStyle =
    m.role === 'user'
      ? {
          color: 'grey',
          backgroundColor: '#343541',
          borderColor: 'grey',
          borderStyle: 'solid',
          borderWidth: 1,
        }
      : {
          color: 'white',
          backgroundColor: '#40414f',
        }

  return (
    <Card style={cardStyle}>
      <Typography
        align={'left'}
        px={2}
        style={{
          width: '80px',
          backgroundColor: '#343541',
          borderColor: 'grey',
          borderStyle: 'solid',
          borderWidth: 1,
        }}
      >
        {m.role}
      </Typography>
      <CardContent>
        <Typography
          p={2}
          component={'div'}
          align={'left'}
          fontFamily={baseFont}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{ code: CodeBlock }}
          >
            {m.content}
          </ReactMarkdown>
        </Typography>
        <Typography align={'right'} fontSize={10}>
          {formatTime(m.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  )
}
