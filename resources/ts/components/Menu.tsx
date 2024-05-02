
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthUser } from '@/hooks/useAuth';
import styled from '@emotion/styled'
import { Link, List, ListItem, Typography, Grid } from '@mui/material';

const Menu: React.FC = () => {
    const [user, setUser] = useState<any | null>(null); // ユーザーの状態を管理するuseStateフック

    useEffect(() => {
        const fetchUser = async () => {
            const user = await useAuthUser(); // useAuthUserフックの非同期呼び出し
            setUser(user); // 取得したユーザーをuseStateフックにセット
        };

        fetchUser(); // 非同期関数を実行
    }, []); // マウント時にのみ実行するため、空の依存配列を渡す

    // @ts-ignore
    return (
        <nav>
            <Grid container justifyContent="center">
                <ListWrapper>
                    <ListItemWrapper>
                        <StyledLink to="/">TOP</StyledLink>
                    </ListItemWrapper>
                    <ListItemWrapper>
                        <StyledLink to="/3d-object">3D Object</StyledLink>
                    </ListItemWrapper>
                    {user !== null && (
                        <>
                            {!user && (
                                <ListItemWrapper>
                                    <StyledLink  to="/login">ログイン</StyledLink>
                                </ListItemWrapper>
                            )}
                            {user && (
                                <ListItemWrapper>
                                    <StyledLink to="/dashboard">ダッシュボード</StyledLink>
                                </ListItemWrapper>
                            )}
                        </>
                    )}
                </ListWrapper>
            </Grid>
        </nav>
    );
}

// スタイルコンポーネントを使ってスタイルを定義
const ListWrapper = styled(List)`
    display: flex;
    gap: 20px;
`;
const ListItemWrapper = styled(ListItem)`
    width: auto;
`;
const StyledLink = styled(RouterLink)`
    text-decoration: none;
    width: auto;
    padding: 1px 1px;
    color: inherit;
    &:hover {
        text-decoration: underline;
    }
`;

export default Menu;
