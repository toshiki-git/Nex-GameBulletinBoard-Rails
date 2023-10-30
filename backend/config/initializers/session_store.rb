if Rails.env === 'production'
    Rails.application.config.session_store :cookie_store, key: '_nex_app_session', 
    same_site: :none, secure: true, domain: 'https://nex-game-bulletin-board-rails.vercel.app'
else
    Rails.application.config.session_store :cookie_store, key: '_nex_app_session'
end