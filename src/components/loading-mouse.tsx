export function LoadingMouse() {
    return (
        <div className="flex justify-center items-center">
            <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="loading-wheel-and-hamster">
                <div className="loading-wheel" />
                <div className="loading-hamster">
                    <div className="loading-hamster__body">
                        <div className="loading-hamster__head">
                            <div className="loading-hamster__ear" />
                            <div className="loading-hamster__eye" />
                            <div className="loading-hamster__nose" />
                        </div>
                        <div className="loading-hamster__limb loading-hamster__limb--fr" />
                        <div className="loading-hamster__limb loading-hamster__limb--fl" />
                        <div className="loading-hamster__limb loading-hamster__limb--br" />
                        <div className="loading-hamster__limb loading-hamster__limb--bl" />
                        <div className="loading-hamster__tail" />
                    </div>
                </div>
                <div className="loading-spoke" />
            </div>
        </div>
    )
}