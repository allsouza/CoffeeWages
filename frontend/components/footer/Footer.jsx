import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { useDispatch } from 'react-redux';
import { toggleDarktheme } from '../../actions/theme_actions';
import { buttonColor, footerColor } from '../DarkThemeProvider';
import styled from 'styled-components';

const source = 'https://docs.google.com/spreadsheets/d/1oE2avtfGQRuSI1-gltcIw-AazA3ov3dEoX-sTbPI6Jw/edit?fbclid=IwAR1T3ttg8PBZ2Ppi5w2J2R1UfUtF6h3eYUM6u7u6xIte9qdtHUz6T12unIc#gid=0';

const Anchor = styled.a`
    color: ${buttonColor}
`;

const Foot = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
    background: ${footerColor};
    width: 100%;
    box-sizing: border-box;

    &-site-explanation {
        width: 40%
    }

    &-personal-info {
        display: flex;
        width: 40%;
        justify-content: space-between;

        & > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 102px;
        }

        & span {
            text-align: center;
        }

        &-links {
            display: flex;
            justify-content: space-between;
        }
    }

`;

export default function Footer() {
    const dispatch = useDispatch();

    return (
        <Foot>
            <div className='footer-site-explanation'>
                Initial seed data pulled from <Anchor href={source} target='_blank'>2019 wage transparency spreadsheets</Anchor>
            </div>
            <a onClick={() => dispatch(toggleDarktheme())}>
                <WbIncandescentIcon />
            </a>
            <div className='footer-personal-info'>
                <div>
                    <div className='footer-personal-info-links'>
                        <Anchor href="https://github.com/drewwebs">
                            <GitHubIcon />
                        </Anchor>
                        <Anchor href="https://www.linkedin.com/in/drew-webster-4261a934/">
                            <LinkedInIcon />
                        </Anchor>
                        <Anchor href="https://drewwebster.dev">
                            <LanguageIcon />
                        </Anchor>
                    </div>
                    <span>Drew Webster</span>
                </div>
                <div>
                    <div className='footer-personal-info-links'>
                        <Anchor href="https://github.com/allsouza">
                            <GitHubIcon />
                        </Anchor>
                        <Anchor href="https://www.linkedin.com/in/andre-souza-2ab6a3155/">
                            <LinkedInIcon />
                        </Anchor>
                        <Anchor href="https://allsouza.github.io/">
                            <LanguageIcon />
                        </Anchor>
                    </div>
                    <span>Andre Souza</span>
                </div>
                <div>
                    <div className='footer-personal-info-links'>
                        <Anchor href="https://github.com/bradlarsoncode">
                            <GitHubIcon />
                        </Anchor>
                        <Anchor href="https://www.linkedin.com/in/bradlarsoncode/">
                            <LinkedInIcon />
                        </Anchor>
                        <Anchor href="http://www.bradlarson.me/">
                            <LanguageIcon />
                        </Anchor>
                    </div>
                    <span>Brad Larson</span>
                </div>
            </div>
        </Foot>
    )
}