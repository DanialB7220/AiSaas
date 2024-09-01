const LandingLayout = ({
    children
}:{
    children: React.ReactNode;
}) => {
    return ( 
        <main className="h-full bg-[#111c27] overflow-auto">
            <div className="mx-auto max-w-scree-xl h-full w-full">
                {children}
            </div>
        </main>
     );
}
 
export default LandingLayout;