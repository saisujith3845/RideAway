import Footer from "../Footer";
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
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout;