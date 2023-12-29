import { useState } from "react"

export const TwitterFollowCard = ({ formatUserName, children, userName = "Elon Musk", name, initialFollowing }) => {

    //const addAt = (userName) => { return `@${userName}` }

    // ESTADO
    const [following, setFollowing] = useState(initialFollowing)

    // RENDERIZADO CONDICIONAL
    const text = following ? 'Siguiendo' : 'Seguir'
    const buttonClassName = following
        ? 'tw-followCard-button is-following'
        : 'tw-followCard-button'
    
    const handleClick = () => {
        setFollowing(!following)
    }

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img className='tw-followCard-avatar'
                    alt="Avatar de Midudev"
                    src={`https://unavatar.io/${userName}`} />
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUsername'>{formatUserName(userName)}</span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-text">{text}</span>
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}
