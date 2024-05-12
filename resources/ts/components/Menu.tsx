import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthUser } from '@/hooks/useAuth';
import styled from '@emotion/styled';
import { List, ListItem, Typography, Grid } from '@mui/material';

const Menu: React.FC = () => {
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await useAuthUser();
            setUser(user);
        };

        fetchUser();
    }, []);

    return (
        <StyledNav>
            <Grid container justifyContent="center">
                <ListWrapper>
                    <ListItemWrapper>
                        <StyledLink to="/">TOP</StyledLink>
                    </ListItemWrapper>
                    {user !== null && (
                        <>
                            {!user && (
                                <ListItemWrapper>
                                    <StyledLink to="/login">ログイン</StyledLink>
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
        </StyledNav>
    );
};

const StyledNav = styled.nav`
    padding: 0;
    background-color: #333;
    color: white;
`;

const ListWrapper = styled(List)`
    display: flex;
    gap: 20px;
`;

const ListItemWrapper = styled(ListItem)`
    width: auto;
`;

const StyledLink = styled(RouterLink)`
    text-decoration: none;
    padding: 10px 15px;
    color: white;
    background-color: #005f73;
    border-radius: 4px;
    &:hover {
        background-color: #004953;
        text-decoration: none;
    }
`;

export default Menu;
