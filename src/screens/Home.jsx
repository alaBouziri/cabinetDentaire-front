import React from 'react'

function Home() {
    return (
        <div className="text-center">
            <img src={process.env.PUBLIC_URL + "/cabinet.svg"} width={400} height={400} />
            <h4>Bienvenue sur votre plateforme de cabinet dentaire</h4>
        </div>

    )
}

export default Home
