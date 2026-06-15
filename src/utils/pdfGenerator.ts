import { jsPDF } from 'jspdf';

interface TimetableEvent {
  date: string;
  day: string;
  session: string;
  gr12: string;
  gr11: string;
  gr10: string;
}

export const generateJuneExamPDF = (lang: 'ENG' | 'ZUL') => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Color Palette Constants
  const colors = {
    primaryRed: [185, 28, 28], // #b91c1c
    darkSlate: [30, 41, 59],   // #1e293b
    textDark: [51, 65, 85],    // #334155
    borderLight: [226, 232, 240], // #e2e8f0
    zebraRow: [248, 250, 252], // #f8fafc
    goldAccent: [255, 215, 0]  // #ffd700
  };

  const timetable: TimetableEvent[] = [
    { date: '01 June', day: 'Mon', session: '08:30 AM', gr12: 'English HL P1 / Zulu HL P1', gr11: 'English HL P1 / Zulu HL P1', gr10: 'English HL P1 / Zulu HL P1' },
    { date: '03 June', day: 'Wed', session: '08:30 AM', gr12: 'Mathematics / Maths Lit P1', gr11: 'Mathematics / Maths Lit P1', gr10: 'Mathematics P1' },
    { date: '05 June', day: 'Fri', session: '08:30 AM', gr12: 'Life Sciences P1', gr11: 'Business Studies P1', gr10: 'Geography P1' },
    { date: '08 June', day: 'Mon', session: '08:30 AM', gr12: 'Physical Sciences P1', gr11: 'Accounting P1', gr10: 'History P1' },
    { date: '10 June', day: 'Wed', session: '08:30 AM', gr12: 'Zulu HL P2 / English HL P2', gr11: 'Zulu HL P2 / English HL P2', gr10: 'Zulu HL P2 / English HL P2' },
    { date: '12 June', day: 'Fri', session: '08:30 AM', gr12: 'Geography P1', gr11: 'Life Sciences P1', gr10: 'Business Studies P1' },
    { date: '15 June', day: 'Mon', session: '08:30 AM', gr12: 'Mathematics / Maths Lit P2', gr11: 'Mathematics / Maths Lit P2', gr10: 'Mathematics P2' },
    { date: '17 June', day: 'Wed', session: '08:30 AM', gr12: 'Physical Sciences P2', gr11: 'Accounting P2', gr10: 'History P2' },
    { date: '19 June', day: 'Fri', session: '08:30 AM', gr12: 'Geography P2', gr11: 'Life Sciences P2', gr10: 'Business Studies P2' },
    { date: '22 June', day: 'Mon', session: '08:30 AM', gr12: 'Accounting P1', gr11: 'Physical Sciences P1', gr10: 'Life Sciences P1' },
    { date: '24 June', day: 'Wed', session: '08:30 AM', gr12: 'History P1 / Business Studies P1', gr11: 'Geography P2 / History P1', gr10: 'Economics P1' },
    { date: '26 June', day: 'Fri', session: '08:30 AM', gr12: 'Tourism / Commerce', gr11: 'Tourism / EMS', gr10: 'Tourism / EMS' }
  ];

  // Title Texts (Bilingual / Active Selected)
  const titleLabels = {
    schoolName: 'UMZILIKAZI SENIOR SECONDARY SCHOOL',
    schoolSubtitle: 'Amajuba District • KwaZulu-Natal Department of Education',
    docTitle: lang === 'ENG' ? 'MID-YEAR JUNE EXAMINATIONS TIMETABLE 2026' : 'UHLELO LWEZIVIVINYO ZAPHAKATHI NONYAKA 2026',
    motto: '“Hlonipha Ze Uhlonishwe” — Respect so that you may be respected',
    tableDate: lang === 'ENG' ? 'Date' : 'Usuku',
    tableSession: lang === 'ENG' ? 'Session' : 'Isikhathi',
    tableGr12: lang === 'ENG' ? 'Grade 12' : 'Ibanga 12',
    tableGr11: lang === 'ENG' ? 'Grade 11' : 'Ibanga 11',
    tableGr10: lang === 'ENG' ? 'Grade 10' : 'Ibanga 10',
    directivesHeader: lang === 'ENG' ? 'IMPORTANT CANDIDATE DIRECTIVES' : 'IMIYALELO EBALULEKILE KUBALINGISWA',
    directives: lang === 'ENG' 
      ? [
          '• Full official Red & White School Uniform is strictly compulsory at all times.',
          '• Candidates must arrive at the examination rooms at least 45 minutes prior (07:45 AM).',
          '• Bring all mandatory stationery in empty, clear plastic pencil cases (No bags inside rooms).',
          '• Strict academic integrity: Any form of cheating leads to immediate disqualification.',
          '• "Hlonipha Ze Uhlonishwe" — Maintain exam decorum and absolute quiet.'
        ]
      : [
          '• Iyunifomu Yesikole Ebomvu Nomhlophe esemthethweni ingesibopho ngaso sonke isikhathi.',
          '• Ababhali kumele bafike emagumbini okubhala okungenani imizuzu engama-45 phambili (07:45 AM).',
          '• Letha zonke izinto zokubhala ezidingekayo emigodleni ephephile evulekile.',
          '• Ubuqotho bezemfundo: Noma yikuphi ukukhohlisa kuholela ekuhoxisweni kwakho ngokushesha.',
          '• "Hlonipha Ze Uhlonishwe" — Gcina ukuziphatha okuhle nokuthula okuphelele.'
        ]
  };

  // --- Design Construction ---

  // 1. Top Decorative Red Banner Strip
  doc.setFillColor(colors.primaryRed[0], colors.primaryRed[1], colors.primaryRed[2]);
  doc.rect(15, 12, 180, 4, 'F');

  // 2. School Name Heading
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.text(titleLabels.schoolName, 105, 23, { align: 'center' });

  // 3. Subheading (District Details)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139); // cool gray text
  doc.text(titleLabels.schoolSubtitle, 105, 28, { align: 'center' });

  // 4. Motto Quote Info
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(colors.primaryRed[0], colors.primaryRed[1], colors.primaryRed[2]);
  doc.text(titleLabels.motto, 105, 33, { align: 'center' });

  // 5. Divider Accent Light Line
  doc.setDrawColor(colors.borderLight[0], colors.borderLight[1], colors.borderLight[2]);
  doc.setLineWidth(0.5);
  doc.line(15, 37, 195, 37);

  // 6. Large Document Main Title Display Banner
  doc.setFillColor(colors.primaryRed[0], colors.primaryRed[1], colors.primaryRed[2]);
  doc.rect(15, 41, 180, 10, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255); // White
  doc.text(titleLabels.docTitle, 105, 47, { align: 'center' });

  // 7. Table Configuration & Coordinates
  const tableStartY = 57;
  const colWidths = {
    date: 24,    // 15 -> 39
    session: 26, // 39 -> 65
    gr12: 44,    // 65 -> 109
    gr11: 43,    // 109 -> 152
    gr10: 43     // 152 -> 195
  };
  const rowHeight = 8.5;

  // -- Draw Table Header --
  doc.setFillColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);
  doc.rect(15, tableStartY, 180, 10, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);

  let currentX = 15;
  // Col 1: Date
  doc.text(titleLabels.tableDate, currentX + 3, tableStartY + 6.5);
  currentX += colWidths.date;
  // Col 2: Session
  doc.text(titleLabels.tableSession, currentX + 3, tableStartY + 6.5);
  currentX += colWidths.session;
  // Col 3: Gr 12
  doc.text(titleLabels.tableGr12, currentX + 3, tableStartY + 6.5);
  currentX += colWidths.gr12;
  // Col 4: Gr 11
  doc.text(titleLabels.tableGr11, currentX + 3, tableStartY + 6.5);
  currentX += colWidths.gr11;
  // Col 5: Gr 10
  doc.text(titleLabels.tableGr10, currentX + 3, tableStartY + 6.5);

  // -- Draw Table Rows --
  let currentY = tableStartY + 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);

  timetable.forEach((item, index) => {
    // Zebra Striping background fill
    if (index % 2 === 1) {
      doc.setFillColor(colors.zebraRow[0], colors.zebraRow[1], colors.zebraRow[2]);
      doc.rect(15, currentY, 180, rowHeight, 'F');
    }

    // Grid row divider line
    doc.setDrawColor(colors.borderLight[0], colors.borderLight[1], colors.borderLight[2]);
    doc.line(15, currentY + rowHeight, 195, currentY + rowHeight);

    // Text details (Horizontal alignment inside box columns)
    doc.setTextColor(colors.darkSlate[0], colors.darkSlate[1], colors.darkSlate[2]);

    let rowX = 15;
    
    // Day + Date Column
    doc.setFont('helvetica', 'bold');
    doc.text(`${item.day} ${item.date}`, rowX + 2, currentY + 5.5);
    
    // Session Time Column
    rowX += colWidths.date;
    doc.setFont('helvetica', 'normal');
    doc.text(item.session, rowX + 2, currentY + 5.5);

    // Subject Columns has to fit correctly (so we use clipping or small text wrap)
    // Gr 12
    rowX += colWidths.session;
    doc.text(item.gr12, rowX + 2, currentY + 5.5, { maxWidth: colWidths.gr12 - 4 });
    
    // Gr 11
    rowX += colWidths.gr12;
    doc.text(item.gr11, rowX + 2, currentY + 5.5, { maxWidth: colWidths.gr11 - 4 });

    // Gr 10
    rowX += colWidths.gr11;
    doc.text(item.gr10, rowX + 2, currentY + 5.5, { maxWidth: colWidths.gr10 - 4 });

    currentY += rowHeight;
  });

  // Vertical border lines for structured corporate grid layout style
  doc.setDrawColor(colors.borderLight[0], colors.borderLight[1], colors.borderLight[2]);
  let lineX = 15;
  // Start line
  doc.line(lineX, tableStartY, lineX, currentY);
  // Between Date & Session
  lineX += colWidths.date;
  doc.line(lineX, tableStartY, lineX, currentY);
  // Between Session & Gr 12
  lineX += colWidths.session;
  doc.line(lineX, tableStartY, lineX, currentY);
  // Between Gr 12 & Gr 11
  lineX += colWidths.gr12;
  doc.line(lineX, tableStartY, lineX, currentY);
  // Between Gr 11 & Gr 10
  lineX += colWidths.gr11;
  doc.line(lineX, tableStartY, lineX, currentY);
  // End line
  lineX += colWidths.gr10;
  doc.line(lineX, tableStartY, lineX, currentY);

  // 8. Directive Information segment
  const directivesStartY = currentY + 8;
  doc.setFillColor(254, 242, 242); // very soft warm light red warning box
  doc.setDrawColor(254, 202, 202); // soft red border
  doc.rect(15, directivesStartY, 180, 48, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(153, 27, 27); // Dark crimson red text for header
  doc.text(titleLabels.directivesHeader, 20, directivesStartY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);

  let directiveY = directivesStartY + 13;
  titleLabels.directives.forEach((text) => {
    doc.text(text, 20, directiveY);
    directiveY += 6.5;
  });

  // 9. Footnote Page verification
  const footerY = 285;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // light gray
  doc.text('UMZILIKAZI SECONDARY SCHOOL • OFFICIAL EXAMINATION BOARD', 15, footerY);
  doc.text('APPROVED MATRICULATION PATHWAY 2026', 195, footerY, { align: 'right' });

  // Generate and save file download on device
  doc.save(`Umzilikazi_June_MidYear_Timetable_2026_${lang}.pdf`);
};
