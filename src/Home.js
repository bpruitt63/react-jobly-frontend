import React from 'react';

function Home({username}) {
    return (
        <div>        
            {username ? 
                <h1>Welcome back to Jobly, {username}!</h1>
            :
                <>
                    <h1>Welcome to Jobly!</h1>
                    <p>The only site that lets you submit fake applications 
                        to fake jobs at fake companies, without even needing 
                        to upload a resume!
                    </p>
                </>
            }
        </div>
    )
};

export default Home;