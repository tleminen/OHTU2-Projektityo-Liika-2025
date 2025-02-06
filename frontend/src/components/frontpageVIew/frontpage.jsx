import Header from "../header"
import LoginForm from "../loginView/LoginForm"
import Map from "../mapView/map"
import Footer from '../footer';
const Frontpage = () => {
  return (
    <div>
      <Header/>
      <h1>Frontpage placeholder</h1>
      <LoginForm />
      <div>
        <Map />
      </div>
      <div> <Footer/> </div>
    </div>
  )
}

export default Frontpage
