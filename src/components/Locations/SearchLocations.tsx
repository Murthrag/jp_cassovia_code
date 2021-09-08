import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { DefaultLocations } from '../../constants/defaultLocations';

interface Props {
}

const SearchLocations: React.FC<Props> = () => {
    // state
    const [location, setlocation] = useState([])
    const Alllocations = DefaultLocations
    const LocationInput = useRef<HTMLInputElement>(null)

    // submit form
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //searchForMusic()
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        //searchForMusic()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    autoFocus
                    type="text"
                    ref={LocationInput}
                    onChange={handleInput}
                    className="search"
                />
            </form>

        </div >
    )
};

export default SearchLocations;

/*
           <ul>
                {Alllocations.map((loct, id) => (
                    loct.indexOf(LocationInput.current?.value))

                    < li key = { id } >
                    <p>{loct}</p>
                    </li>

                ))}
        </ul>
        */