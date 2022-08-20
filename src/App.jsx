import { useQuery, gql } from '@apollo/client';

const GET_TASKS = gql`
    {
        getAllTasks {
            id
            title
            description
        }
    }
`;

function DisplayTasks() {
    const { loading, error, data } = useQuery(GET_TASKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.getAllTasks.map(({ id, title, description }) => (
        <div key={id}>
            <h3>{title}</h3>
            <p>{description}</p>
            <br />
        </div>
    ));
}

function App() {
    return (
        <div className="App">
            <h2>
                <span role="img" aria-label="rocket">
                    🚀
                </span>
                My first Apollo-Express-React-Mongodb app
            </h2>
            <DisplayTasks />
        </div>
    );
}

export default App;
