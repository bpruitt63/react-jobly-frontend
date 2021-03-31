import React from 'react';
import { Jumbotron } from 'reactstrap';

function Home({username}) {
    return (
        <div>    
            <Jumbotron>   
                {username ? 
                    <>
                        <h1 className='display-4'>Welcome back to Jobly, {username}!</h1>
                        <p className='lead'>Now get Jobling!</p>
                    </>
                :
                    <>
                        <h1 className='display-4'>Welcome to Jobly!</h1>
                        <p className='lead'>The only site that lets you submit fake applications 
                            to fake jobs at fake companies, without even needing 
                            to upload a resume!
                        </p>
                    </>
                }
            </Jumbotron> 
        </div>
    )
};

export default Home;