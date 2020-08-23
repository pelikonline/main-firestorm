<?php
if(!empty($_POST)) {
    $to = 'support@team-firestorm.ru, ';
    $to .= 'kommunikant.rf@gmail.com, ';
    $subject = 'Заявка с junior.team-firestorm.ru';
    $content = '';
 
    foreach($_POST as $key => $value) {
        $updatedValue = htmlspecialchars($value);
        $content .= '
            <tr>
                <td>'.$key.'</td><td>'.$updatedValue.'</td>
            </tr>
        ';
    }
    $messageString = '
        <p>Тестовое содержимое <br /> Вторая строка текста</p>
        <table>'.$content.'</table>
    ';
    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; 

    // AMO.CRM
    $_REQUEST = array_merge($_REQUEST, $_COOKIE);
    $url_delivery_amo = 'https://apicrm.ru/amo/domain/junior.team-firestorm.ru/amocrm_api.php';
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url_delivery_amo);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $_REQUEST);
    curl_setopt($curl,CURLOPT_HEADER,false);
    curl_exec($curl);
    curl_close($curl); #Заверашем сеанс cURL
    // AMO.CRM / utm_cookie.min.js

    mail($to, $subject, $messageString, $headers);
}
?>
 