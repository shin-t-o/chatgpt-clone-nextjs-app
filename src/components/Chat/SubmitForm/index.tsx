import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { Controller } from 'react-hook-form'
import { baseFont } from '@/constant/style'

type Props = {
  control: any
  errors: any
  handleSubmit: () => void
  isLoading: boolean
}

const SubmitForm = ({ control, errors, handleSubmit, isLoading }: Props) => {
  const validationRules = {
    content: {
      required: 'Enter your question.',
    },
  }

  return (
    <Stack sx={{ m: 4 }}>
      <Controller
        name="content"
        control={control}
        rules={validationRules.content}
        render={({ field }) => (
          <TextField
            {...field}
            type="content"
            multiline
            minRows={3}
            maxRows={10}
            error={errors.content !== undefined}
            helperText={errors.content?.message}
            style={{ backgroundColor: '#40414f' }}
            InputProps={{
              style: {
                fontSize: 14,
                color: 'white',
                fontFamily: baseFont,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? (
                      <CircularProgress style={{ color: 'grey' }} />
                    ) : (
                      <SendIcon style={{ color: 'grey' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Stack>
  )
}

export default SubmitForm
