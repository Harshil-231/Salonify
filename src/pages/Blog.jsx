
import React, { useState } from "react";
import { Navbar } from '../Components/Common/Navbar.jsx'
import "../Styles/priceblog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Blog = () => {
    const allBlogPosts = [
        {
            title: "How you can book 100+ clients a month using Fresha's tools",
            date: "January 29, 2025",
            description: "With the demands of daily operations, finding time to focus on growing your client base can be a challenge. So how can you make the process easier?",
            category: "Business Tips",
            img: "images/CLIENT3.jpg",
        },
        {
            title: "Fresha Awards 2025",
            date: "January 17, 2025",
            description: "We’re excited it’s time again to announce our winners for our annual Best in Class and Highly Recommended awards.",
            category: "Salonify News",
            img: "images/CLIENT2.jpg",
        },
        {
            title: "New year, new features to take your business to the next level",
            date: "December 20, 2024",
            description:
                "Here’s a sneak peek at some major new features coming to you in 2025. The team at Fresha is hard at work on exciting updates.",
            category: "Features",
            img: "images/CLIENT1.jpg",
        },
        {
            title: "Top marketing strategies for beauty salons in 2025",
            date: "November 10, 2024",
            description:
                "Marketing trends are evolving rapidly. Here’s how you can stay ahead and attract more clients to your salon this year.",
            category: "Business Tips",
            img: "images/SALON1.jpg",
        },
        {
            title: "The ultimate guide to managing salon appointments efficiently",
            date: "October 5, 2024",
            description:
                "Managing bookings effectively can improve customer satisfaction and boost revenue. Learn the best practices for appointment management.",
            category: "Meet the Partners",
            img: "images/SALON2.jpg",
        },
        {
            title: "How to create a relaxing ambiance in your salon",
            date: "September 15, 2024",
            description:
                "The atmosphere in your salon plays a crucial role in client retention. Discover tips on how to make your salon feel like a luxury retreat.",
            category: "Meet the Partners",
            img: "images/SALON3.jpg",
        },
        {
            title: "Boost your revenue with these upselling techniques",
            date: "August 20, 2024",
            description:
                "Upselling is an art that can significantly increase your profits. Learn the best upselling strategies for your salon business.",
            category: "Business Tips",
            img: "images/WOMAN4.jpg",
        },
    ];

    const categories = [
        "All Topics",
        "Meet the Partners",
        "Features",
        "Salonify News",
        "Business Tips",
    ];

    const [selectedCategory, setSelectedCategory] = useState("All Topics");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    // Filter posts based on category
    const filteredPosts =
        selectedCategory === "All Topics"
            ? allBlogPosts
            : allBlogPosts.filter((post) => post.category === selectedCategory);

    // Pagination Logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <>
            <Navbar />
            <div className="blog-container">
                <h1 className="blog-title">Latest News on Salonify</h1>

                {/* Category Buttons */}
                <div className="blog-nav">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`blog-button ${selectedCategory === category ? "active" : ""
                                }`}
                            onClick={() => {
                                setSelectedCategory(category);
                                setCurrentPage(1); // Reset to first page on category change
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Blog Posts Grid */}
                <div className="blog-grid">
                    {currentPosts.length > 0 ? (
                        currentPosts.map((post, index) => (
                            <div key={index} className="blog-card">
                                <img src={post.img} alt="Blog" className="blog-image" />
                                <div className="blog-content">
                                    <h3 className="blog-heading">{post.title}</h3>
                                    <p className="blog-date">by Salonify on {post.date}</p>
                                    <p className="blog-description">{post.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="blog-no-posts">No posts available for this category.</p>
                    )}
                </div>

                {/* Pagination */}
                {filteredPosts.length > postsPerPage && (
                    <div className="blog-pagination">

                        <button
                            className="blog-page-previous-button"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <button
                            className="blog-page-next-button"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
