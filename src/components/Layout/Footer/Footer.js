import './Footer.scss';

export default function Footer() {
    return (
        <div className="jc-evenly wrapper-footer">
            <a href="/">
                <h1 className="logoFooter">Comics</h1>
            </a>
            <div className="copyright">
                <p>Comics có rất nhiều comics hay.....</p>
                <br />
                <p>Copyright © 2023 Comics.com</p>
            </div>
        </div>
    );
}