import { logOut } from "../features/login/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const LandingPage = () => {
    const dispatch = useDispatch();
    const { loggedInAccount } = useSelector((store) => store.login);

    return(
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 min-h-screen mx-auto">
                <div className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
                    Welcome, {loggedInAccount.accountName}
                </div>
                <button className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => {
                    dispatch(logOut());
                }}>Log Out</button>
            </div>
        </section>
    );
}

export default LandingPage;