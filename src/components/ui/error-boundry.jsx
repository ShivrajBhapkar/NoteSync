
import { useNavigate} from "react-router-dom";

export default function ErrorBoundary() {
    const navigate = useNavigate();
    // const { logout } = useAuth();
    // const error = useRouteError();

    // useEffect(() => {
    //     const key = `WS_ERRORS_${dayjs().format("DD-MM-YYYY")}`;
    //     const errors = localStorage.getItem(key);
    //     let exisiting: Array<any>;

    //     try {
    //         exisiting = typeof errors === "string" ? JSON.parse(errors) : [];
    //     } catch {
    //         exisiting = [];
    //     }

    //     localStorage.setItem(
    //         key,
    //         JSON.stringify([...exisiting, error?.toString()])
    //     );
    // }, [error]);

    return (
        <>
            <main className="grid h-screen min-h-full w-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">
                        500
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Something went wrong!
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Sorry, seems like there was some unexpected problem.
                    </p>
                    {/* <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className={buttonVariants({
                                variant: "primary",
                                class: "!h-auto !py-3.5",
                            })}
                        >
                            Go back home
                        </Link>

                        <Button
                            variant="light"
                            onClick={() => {
                                // logout();
                                navigate("/");
                            }}
                        >
                            Logout
                        </Button>
                    </div> */}
                </div>
            </main>
        </>
    );
}
