from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    port: int = 8000
    debug: bool = True
    log_level: str = "info"
    
    postgres_host: str = "localhost"
    postgres_port: int = 5432
    postgres_db: str = "shopsmart"
    postgres_user: str = "postgres"
    postgres_password: str = "postgres"

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
