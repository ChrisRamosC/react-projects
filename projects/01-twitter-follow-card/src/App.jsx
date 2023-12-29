import './App.css'
import { TwitterFollowCard } from './assets/TwitterFollowCard';
import { useState } from 'react';

export function App() {

    const formatUserName = (userName) => `@${userName}`



    // renderizado desde el padre
    const [name, setName] = useState('midudev')

    console.log('render with name: ', name)

    // no es recomendable hacerlo de esta manera
    const midudev = { formatUserName: formatUserName, userName: name }

    const users = [
        { userName: 'midudev', name: 'Miguel Ángel Durán', isFollowing: true },
        { userName: 'MoureDev', name: 'Brais Moure', isFollowing: false },
        { userName: 'ElZeeeein', name: 'Andy Dante Merino', isFollowing: false },
    ]

    return (
        <section className="App">
            {
                users.map((user) => (
                    <TwitterFollowCard
                        formatUserName={formatUserName}
                        userName={user.userName}
                        key={user.userName}
                        initialFollowing={user.isFollowing}
                    >
                        {user.name}
                    </TwitterFollowCard>
                ))
            }

        </section>

    );
}   