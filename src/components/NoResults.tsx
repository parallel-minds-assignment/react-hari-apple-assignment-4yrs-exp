import React from 'react';

export const NoResults: React.FC<{ message?: string }> = ({ message = "No results found" }) => {
    return (
        <div className="no-results-container">
            <div className="no-results-emoji">🕵️‍♂️</div>
            <h2 className="no-results-title">{message}</h2>
            <p className="no-results-subtitle">
                Try checking your spelling or using different keywords.
            </p>
        </div>
    );
};
