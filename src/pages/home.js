import React from 'react';
import Statistic from '../flagments/statistic';
import Management from '../flagments/managements';

const HomePage = () => {

    return (
        <>
            <div className='content-header'>
                <span className="title">
                    Trang Chủ
                </span>
            </div>
            <section className="home-statistic">
                <Statistic />
            </section>
            <hr></hr>
            <section className='home-managements'>
                <Management />
            </section>
        </>
    )
}

export default HomePage;