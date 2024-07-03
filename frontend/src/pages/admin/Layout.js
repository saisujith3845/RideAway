import Header from "./AdminHeader"

const Layout=({children})=>{
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout;