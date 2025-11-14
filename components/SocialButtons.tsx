import React from 'react';

const SocialButtons = () => {
  const socials = [
    {
      name: 'Instagram',
      icon: (
        <svg 
          className="w-7 h-7 sm:w-8 sm:h-8" 

          fill="currentColor" 

          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 

            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" 

            clipRule="evenodd" 

          />
        </svg>
      ),
      url: 'https://instagram.com/pinaddict0',
      label: 'Seguici su Instagram',
    },
    // {
    //   name: 'Facebook',
    //   icon: (
    //     <svg 
    //       className="w-7 h-7 sm:w-8 sm:h-8" 

    //       fill="currentColor" 

    //       viewBox="0 0 24 24"
    //       aria-hidden="true"
    //     >
    //       <path 
    //         fillRule="evenodd" 

    //         d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" 

    //         clipRule="evenodd" 

    //       />
    //     </svg>
    //   ),
    //   url: 'https://facebook.com',
    //   label: 'Seguici su Facebook',
    // },
    {
      name: 'TikTok',
      icon: (
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" 
          />
        </svg>
      ),
      url: 'https://tiktok.com/@pinaddict0',
      label: 'Seguici su TikTok',
    },
    {
      name: 'Vinted',
      icon: (
        <svg 
        className="w-7 h-7 sm:w-8 sm:h-8 text-white"
        viewBox="0 0 192 192" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlSpace="preserve" 
        >
          <g id="SVGRepo_bgCarrier" 
            strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" 
            strokeLinecap="round" 
            strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> 
            <g fill="none" 
              stroke="#ffffff" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeMiterlimit="15" 
              strokeWidth="12"> 
              <path d="M50.238 37.67c-2.755 35.056 5.454 102.65 10.204 121.69m0 0c3.204 11.958 24.991 15.612 41.854 1.504m.004.006c22.004-20.527 22.726-53.965 45.439-134.68m-.009-.006c1.766-6.592-2.701-3.395-2.701-3.395-5.883 3.397-5.329 3.899-6.135 4.705m.006 0c-1.128 1.128-3.417 1.34-3.417 1.34-1.512 0-2.62 1.562-2.62 1.562m-.003 0c-12.953 12.953-24.494 69.177-33.362 95.376-2.14 7.983-8.33 19.848-8.33 19.848-3.141-8.374-3.681-92.493-3.681-92.493" ></path> 
              <path d="M87.49 53.127c0-5.2.453-9.836.453-9.836m0 0c.438-21.124-12.821-17.704-22.559-17.087M50.238 37.67c0-2.079 2.415-8.055 15.145-11.466" ></path> 
            </g> 
          </g>
        </svg>),
      url: 'https://www.vinted.it/member/55403181',
      label: 'Seguici su Vinted',
    },
  ];

  return (
    <section className="w-full px-4 py-8 sm:py-10 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="max-w-16 max-h-16 bg-[#f06aa7] hover:bg-green-600 text-white w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialButtons;