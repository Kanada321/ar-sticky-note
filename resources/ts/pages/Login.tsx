import React, { useState } from 'react'
import { useLogin } from '@/hooks/useAuth'

const LoginPage: React.FC = () => {
    const login = useLogin()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsLoading(true);
        login.mutate({
            email: email,
            password: password,
        }, {
            onSuccess: () => {
                setIsLoading(false);
                // ログイン成功時の処理
            },
            onError: () => {
                setIsLoading(false);
                alert('ログインに失敗しました。'); // エラーハンドリングを適切に
            }
        });
    }

    return (
        <div>
            <h1>ログイン</h1>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <div>
                        <label htmlFor="email">メールアドレス：</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">パスワード：</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>{isLoading ? 'ローディング...' : '送信'}</button>
                </fieldset>
            </form>
        </div>
    )
}

export default LoginPage
