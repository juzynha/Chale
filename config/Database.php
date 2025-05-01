<?php
class Database
{
    private static $dbname = "chale";
    private static $host = "localhost";
    private static $user = "root";
    private static $pass = "";
    private static $con = null;

    public function __construct()
    {
        die("a função do construtor não pode ser inicializada");
    }

    public static function conectar()
    {
        if (null == self::$con) {
            try {
                self::$con = new PDO("mysql:host=" . self::$host . ";dbname=" . self::$dbname, self::$user, self::$pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            } catch (Exception $erro) {
                die($erro->getMessage());
            }
        }
        return self::$con;
    }

    public static function desconectar()
    {
        self::$con = null;
    }
}
