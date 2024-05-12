import React from 'react';
import Menu from '@/components/Menu';
import { Grid, Typography, Link } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ARMaker from '@/assets/pattern-AR.png';
import styled from '@emotion/styled';

const TopPage: React.FC = () => {
    return (
        <StyledContainer>
            <Menu />
            <Typography variant="h2" color="primary" gutterBottom>Top</Typography>
            <ARSection>
                {[1, 2, 3].map((item) => (
                    <ARItem key={item}>
                        <Link href={`/ar-experience/${item}`} underline="hover" color="inherit">
                            AR {item}
                        </Link>
                        <Typography variant="body2">Explore AR experience {item}</Typography>
                        <QrCodeIcon color="action" />
                    </ARItem>
                ))}
                <ARMarker>
                    <img src={ARMaker} alt="AR Marker" style={{ width: '10em', height: '10em' }} />
                </ARMarker>
            </ARSection>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    padding: 0;
    background-color: #f9f9f9;
    min-height: 100vh;
`;

const ARSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
`;

const ARItem = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    width: 300px;
    text-align: center;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const ARMarker = styled.div`
    padding: 20px;
    text-align: center;
`;

export default TopPage;
