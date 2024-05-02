import React, { useState } from 'react'
import { useLogin } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import Menu from '@/components/Menu'
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material'

const LoginPage: React.FC = () => {
    const login = useLogin()
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsLoading(true);
        login.mutate({
            email: email,
            password: password,
        }, {
            onSuccess: () => {
                setIsLoading(false);
                navigate('/dashboard');
            },
            onError: () => {
                setIsLoading(false);
                setErrorMessage('ログインに失敗しました。'); // エラーメッセージを更新
            }
        });
    }

    return (
        <div>
            <Menu />
            <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h4">
                    ログイン
                </Typography>

                <Box component="form" noValidate sx={{ mt:1 }} className='form' onSubmit={onSubmit}>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="メールアドレス"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="パスワード"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                    {errorMessage && ( // エラーメッセージがある場合のみ表示
                        <Typography color="error">
                            {errorMessage}
                        </Typography>
                    )}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt:3, mb:2 }}
                    disabled={isLoading}
                >
                    {isLoading ? 'ローディング...' : 'ログイン'}
                </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                パスワードを忘れた
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link href="#" variant="body2">
                                新規登録
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
        </div>
    )
}


export default LoginPage
