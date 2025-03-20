import Header from '../header'
import Sidebar from '../sidebar'

const Layout=({ children })=>{

    return(
        <>
      <div component="layout">
        <div  id="routerDiv"></div>
        <Header/>

        <div className={`main-wrapper flex`}>
          <div className="main-sidebar scrollbar">
               <Sidebar />
          </div>
          <main className="main">
            <div className="mainarea">
              {children}
            </div>
          </main>
        </div>
      </div>
        </>
    )
}

export default Layout;