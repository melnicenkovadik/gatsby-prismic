import React, {useEffect} from 'react'
import RichText from "prismic-reactjs/src/Component";

const MyProjects = ({slice}) => {
    useEffect(() => {
        !(function () {
            let analytics = (window.analytics = window.analytics || []);
            if (!analytics.initialize)
                if (analytics.invoked)
                    window.console &&
                    console.error &&
                    console.error("Segment snippet included twice.");
                else {
                    analytics.invoked = !0;
                    analytics.methods = [
                        "trackSubmit",
                        "trackClick",
                        "trackLink",
                        "trackForm",
                        "pageview",
                        "identify",
                        "reset",
                        "group",
                        "track",
                        "ready",
                        "alias",
                        "debug",
                        "page",
                        "once",
                        "off",
                        "on"
                    ];
                    analytics.factory = function (t) {
                        return function () {
                            let e = Array.prototype.slice.call(arguments);
                            e.unshift(t);
                            analytics.push(e);
                            return analytics;
                        };
                    };
                    for (let t = 0; t < analytics.methods.length; t++) {
                        let e = analytics.methods[t];
                        analytics[e] = analytics.factory(e);
                    }
                    analytics.load = function (t, e) {
                        let n = document.createElement("script");
                        n.type = "text/javascript";
                        n.async = !0;
                        n.src =
                            "https://cdn.segment.com/analytics.js/v1/" +
                            t +
                            "/analytics.min.js";
                        let a = document.getElementsByTagName("script")[0];
                        a.parentNode.insertBefore(n, a);
                        analytics._loadOptions = e;
                    };
                    analytics.SNIPPET_VERSION = "4.1.0";
                    analytics.load("FQ5NJmRc6LrFKVAC6ofHlSU7WIwGAdj5");
                    analytics.page();
                }
        })();
    }, [])

    return (
        <section className="my-projects">
            <RichText render={slice.primary.my_projects_title.raw}/>
            <div className='my-projects__main'>
                <section className="cards">
                    {slice.items.map((item, i) => {
                        return (
                                <div key={i} className="card" >
                                    <a target={'_blank'} href={item.link.url}>
                                    <div className="card__image-container">
                                        <img
                                            src={item.item_image.url}
                                            alt={item.item_image.alt}
                                        />
                                    </div>
                                    <div className="card__content">
                                        <p className="card__title text--medium">
                                            {item.item_title.text}
                                        </p>
                                        <div className="card__info">
                                            <p className="text--medium">
                                                {item.item_description.text}
                                            </p>
                                            <p className="card__price text--medium">
                                                {item.item_stack_describe.text}
                                            </p>
                                        </div>
                                    </div>
                                    </a>
                                </div>
                        )
                    })}
                </section>
            </div>


        </section>
    )
};


export default MyProjects
