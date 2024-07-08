export default function Alerta({ children }) {
    return (
        <>
            {children.map((error, i) => 
                <div key={i} className="text-center my-2 bg-red-600 text-white font-bold p-3 uppercase">
                    {error}
                </div>
            )}
        </>
    );
}
