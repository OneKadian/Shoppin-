import React from 'react';

const LanguageOptions = () => {
  return (
    <div className="text-center mt-8 text-sm">
      <span className="text-gray-400 mr-2">Google offered in:</span>
      {['हिन्दी', 'বাংলা', 'తెలుగు', 'मराठी', 'தமிழ்', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം', 'ਪੰਜਾਬੀ'].map(
        (lang, index) => (
          <React.Fragment key={lang}>
            <a href="#" className="language-link">
              {lang}
            </a>
            {index < 8 && <span className="mx-2 text-gray-400">·</span>}
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default LanguageOptions;