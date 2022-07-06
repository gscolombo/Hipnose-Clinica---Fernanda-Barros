<?php 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require '../vendor/autoload.php';

    $data = json_decode(file_get_contents("php://input", true), true);

    $noFieldEmpty = $data['name'] !== "" && $data["email"] !== "" && $data["message"] !== "";
    $regexp = "/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/";
    $emailIsValid = preg_match($regexp, $data["email"]);

    if ($noFieldEmpty && $emailIsValid) {
        $mail = new PHPMailer(true);

        try {
            $mail -> isSMTP();
            $mail -> Host = 'smtp.gmail.com';
            $mail -> Username = 'gabriel.souza.colombo13@gmail.com';
            $mail -> Password = '';
            $mail -> SMTPAuth = true;
            $mail -> Port = 587;
            $mail -> SMTPSecure = 'tls';
            
            $mail -> setFrom($data["email"], $data['name']);
            $mail -> addAddress("gabriel.souza.colombo13@gmail.com", "Gabriel");

            $mail -> Subject = "";
            $mail -> Body = $data["message"];

            if ($mail -> send()) {
                http_response_code(200);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e -> getMessage(), "message" => "Erro ao enviar e-mail"]);
        }
    } else {
        if (!$emailIsValid) {
            http_response_code(400);
            echo json_encode(["message" => "E-mail inválido"]);
        }
    }
?>