import './Footer.scss';

export default function Footer() {
    return (
        <div className="jc-evenly wrapper-footer">
            <a href="/">
                <h1 className="logoFooter">Làng Truyện</h1>
            </a>
            <div className="copyright">
                <p>Làng Truyện có rất nhiều truyện hay.....</p>
                <br />
                <p>Copyright © 2023 Langtruyen.com</p>
            </div>
        </div>
    );
}
