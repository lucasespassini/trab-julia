
CREATE
DEFINER = 'admin'@'%'
TRIGGER check_limite
BEFORE INSERT
ON participante_evento
FOR EACH ROW
BEGIN

  -- DECLARA UMA VARIÁVEL PRA RECEBER A QUANTIDADE DE PARTICIPANTES
  DECLARE total_participantes int;
  DECLARE limite_evento int;

  -- CONTA QUANTOS PARTICIPANTES JA TEM
  SELECT
    COUNT(*) INTO total_participantes
  FROM participante_evento
  WHERE EVENTO_ID = NEW.EVENTO_ID;

  -- VERIFICA O LIMITE DO EVENTO LA NA TABELA DE EVENTOS
  SELECT
    LIMITE_PARTICIPANTES INTO limite_evento
  FROM EVENTOS
  WHERE EVENTO_ID = NEW.EVENTO_ID;

  -- COMPARA ANTES E SE A QUANTIDADE FOR MAIOR QUE O LIMITE, ELE NEGA
  IF total_participantes >= limite_evento THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Não é possível inserir novo participante. Capacidade do evento atingida';
  END IF;

END