class JwtService
    HMAC_SECRET = Rails.application.credentials.secret_key_base
  
    def self.encode(payload)
      JWT.encode(payload, HMAC_SECRET, 'HS256')
    end
  
    def self.decode(token)
      decoded_token = JWT.decode(token, HMAC_SECRET, true, { algorithm: 'HS256' })
      decoded_token.first
    rescue JWT::DecodeError => e
      nil
    end
  end
  

=begin   class JwtService
    HMAC_SECRET = Rails.application.credentials.secret_key_base
  
    def self.encode(payload, expiration = 1.hour.from_now)
      # expをペイロードに追加
      payload[:exp] = expiration.to_i
      
      JWT.encode(payload, HMAC_SECRET, 'HS256')
    end
  
    def self.decode(token)
      decoded_token = JWT.decode(token, HMAC_SECRET, true, { algorithm: 'HS256' })
      decoded_token.first
    rescue JWT::DecodeError => e
      nil
    end
  end =end