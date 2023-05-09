// import Header from '../Components/Header';
// import styles from './DefaultLayout.module.scss';
// import classNames from 'classnames/bind';

// let cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            {/* <Header /> */}
            <h2>Header</h2>{' '}
            <div>
                {/* <Sidebar /> */}
                <div> {children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
