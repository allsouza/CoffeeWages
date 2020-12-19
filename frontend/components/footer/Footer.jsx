import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';

export default function Footer() {
    const source = 'https://docs.google.com/spreadsheets/d/1oE2avtfGQRuSI1-gltcIw-AazA3ov3dEoX-sTbPI6Jw/edit?fbclid=IwAR1T3ttg8PBZ2Ppi5w2J2R1UfUtF6h3eYUM6u7u6xIte9qdtHUz6T12unIc#gid=0';

    return (
        <footer className="footer">
            <div className='footer-site-explanation'>
                Initial seed data pulled from <a href={source}>2019 wage transparency spreadsheets</a>
            </div>
            <div className='footer-personal-info'>
                <div>
                    <div className='footer-personal-info-links'>
                        <a href="https://github.com/drewwebs">
                            <GitHubIcon color='action' />
                        </a>
                        <a href="https://www.linkedin.com/in/drew-webster-4261a934/">
                            <LinkedInIcon color='action' />
                        </a>
                        <a href="https://drewwebster.dev">
                            <LanguageIcon color='action' />
                        </a>
                    </div>
                    <span>Drew Webster</span>
                </div>
                <div>
                    <div className='footer-personal-info-links'>
                        <a href="https://github.com/allsouza">
                            <GitHubIcon color='action' />
                        </a>
                        <a href="https://www.linkedin.com/in/andre-souza-2ab6a3155/">
                            <LinkedInIcon color='action' />
                        </a>
                        <a href="https://allsouza.github.io/">
                            <LanguageIcon color='action' />
                        </a>
                    </div>
                    <span>Andre Souza</span>
                </div>
                <div>
                    <div className='footer-personal-info-links'>
                        <a href="https://github.com/bradlarsoncode">
                            <GitHubIcon color='action' />
                        </a>
                        <a href="https://www.linkedin.com/in/bradlarsoncode/">
                            <LinkedInIcon color='action' />
                        </a>
                        <a href="http://www.bradlarson.me/">
                            <LanguageIcon color='action' />
                        </a>
                    </div>
                    <span>Brad Larson</span>
                </div>
            </div>
        </footer>
    )
}