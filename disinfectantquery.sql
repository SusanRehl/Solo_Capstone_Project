CREATE TABLE products (
	id SERIAL PRIMARY KEY NOT NULL,
	productname VARCHAR(30),
	manufacturer VARCHAR(30),
	epagregno VARCHAR(20),
	chemistry VARCHAR(30),
	image VARCHAR(50),
	areas VARCHAR(10),
	surfaces VARCHAR(10),
	bvclaims TEXT,
	bvkill NUMERIC,
	noroclaim BOOLEAN,
	norokill NUMERIC,
	cdiffclaim BOOLEAN,
	cdiffkill NUMERIC,
	fungiclaim BOOLEAN,
	fungikill NUMERIC,
	hmis VARCHAR(5),
	ppe VARCHAR(50),
	equipment VARCHAR(50),
	format VARCHAR(20),
	sds VARCHAR(200),
	productpage VARCHAR(200),
	techdocs VARCHAR(200),
	epamasterlabel VARCHAR(200),
	scorekill INTEGER,
	scoresafety INTEGER,
	scorepathogens INTEGER
	);
	
	
	INSERT INTO products (productname, manufacturer, epagregno, chemistry, areas, surfaces, bvclaims, bvkill, 	noroclaim, norokill, cdiffclaim, cdiffkill, fungiclaim, fungikill, hmis, ppe, equipment, format, sds, productpage, 	techdocs, epamasterlabel, scorekill, scoresafety, scorepathogens) VALUES ('Clorox Bleach Wipes', 'Clorox', '67619-12', 'sodium hypochlorite (bleach)', 'high', 'hard', 'Adenoviros type 2, Avian Influenza A virus, Human Coronavirus, Hepatitis A virus (HAV), Hepatitis B virus (HBV), Hepatitis C virus (HCV), Herpes Simplex virus type 2, HIV type 1, Influenza A virus, Norovirus, Poliovirus type 1, Rhinovirus, Rotavirus, RSV, Acinetobacter baumannii, Bortedella pertussis, Campylobacter jejuni, Enterobacter aerogenes, Enterobacter cloacae, Enterococcus faecium, VRE, Escherichia coli (E. Coli), Klebsiella pneumoniae, Legionella pneumophila, Listeria monocytogenes, CA-MRSA, Proteus mirabilis, Pseudomonas aeruginosa, Salmonella enterica, Serratia marcescens, Shigella dysentriae, Staphylococcus aureus, LRSA, MRSA, VISA, VRSA, Streptococcus pneumoniae, Streptococcus pyogenes', 1, TRUE, 1, TRUE, 3, TRUE, 3, '1/0/1', 'Eye protection, exam gloves, face mask', 'None', 'RTU Wipes', 'https://www.thecloroxcompany.com/downloads/msds/cloroxhealthcarecloroxhealthcarecloroxhealthcare/cloroxhealthcarebleachgermicidalwipesjw.pdf', 'https://www.cloroxprofessional.com/products/clorox-healthcare-bleach-germicidal-wipes/at-a-glance/', '', '', 10, 7, 10);
	
	
		INSERT INTO products (productname, manufacturer, epagregno, chemistry, areas, surfaces, bvclaims, bvkill, 	noroclaim, norokill, cdiffclaim, cdiffkill, fungiclaim, fungikill, hmis, ppe, equipment, format, sds, productpage, 	techdocs, epamasterlabel, scorekill, scoresafety, scorepathogens) VALUES ('Clorox HP Wipes', 'Clorox', '67619-25', 'hydrogen peroxide', 'intermed', 'hard', 'Avian Influenza A, Cytomegalovirus, Human Hepatitis B virus, Human Hepatitis C virus, Herpes Simplex virus type 1, Herpes Simplex virus type 2, HIV type 1, Human Coronavirus, Influenza A virus (H1N1), Influenza A virus / Hong Kong, Influenza B virus, Norovirus, RSV, Rhinovirus, Rotavirus, Acinetobacter baumannii, Campylobacter jejeuni, Enterobacter aerogenes, VRE, Enterococcus faecium, Escherichia coli, Klebsiella pneumoniae, Klebsiella oxytoca, Pseudomonas aeruginosa, Salmonella enterica, Staphylococcus aureus, MRSA, CA-MRSA, Stenotrophomonas maltophilia, Streptococcus pneumonia, Streptococcus pyogenes', 1, TRUE, 3, FALSE, 0, TRUE, 5, '1/0/0', 'Exam gloves', 'None', 'RTU Wipes', 'https://www.thecloroxcompany.com/downloads/msds/cloroxhealthcarecloroxhealthcarecloroxhealthcare/cloroxhealthcarehydrogenperoxidecleanerdisinfectantwipesjw2014-09-28.pdf', 'https://www.cloroxprofessional.com/products/clorox-healthcare-hydrogen-peroxide-cleaner-disinfectants/at-a-glance/', '', '', 10, 7, 10);
		
		INSERT INTO products (productname, manufacturer, epagregno, chemistry, areas, surfaces, bvclaims, bvkill, 	noroclaim, norokill, cdiffclaim, cdiffkill, fungiclaim, fungikill, hmis, ppe, equipment, format, sds, productpage, 	techdocs, epamasterlabel, scorekill, scoresafety, scorepathogens) VALUES ('Accel TB Wipes', 'Virox', '74559-3', 'hydrogen peroxide', 'intermed', 'hard', 'Acinetobacter baumannii, Avian Influenza H3N2, VRE, E. coli, Hepatitis B (HBV), Hepatitis C (HCV), Herpes Simplex Type 1, Herpes Simplex Type 2, HIV-1, Human Coronavirus, Influenza A Hong Kong, Poliovirus Type 1, Pseudomonas aeruginosa, Rhinovirus, Rotavirus, Salmonella enterica, Staphylococcus aureus, Staphylococcus aureus MRSA', 1, TRUE, 1, FALSE, 0, TRUE, 10, '0/0/0', 'None for routine tasks', 'None', 'RTU Wipes', 'http://unimedcorp.com/MSDS/SDS_AccelTBWipes.pdf', 'http://viroxhealthcare.com/?page=accel-wipes', '', '', 10, 10, 7);
	
