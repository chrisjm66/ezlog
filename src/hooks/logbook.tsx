


export type LogbookEntry = {
  date: string
  totalTime: number
  pic: number
  sic: number
  crossCountry: number
  simImc: number
  actImc: number
  night: number
  dayLandings: number
  nightLandings: number
  totalLandings: number
  holding: number
  approaches: number
  dualGiven: number
  dualRecieved: number
  route: string
  ipc: boolean
  checkride: boolean
  flightReview: boolean
}

/*
total_time
  pic                  Decimal  @default(0.00) @db.Decimal(4, 2)
  sic                  Decimal  @default(0.00) @db.Decimal(4, 2)
  cross_country        Decimal  @default(0.00) @db.Decimal(4, 2)
  sim_imc              Decimal  @default(0.00) @db.Decimal(4, 2)
  actual_imc           Decimal  @default(0.00) @db.Decimal(4, 2)
  night                Decimal  @default(0.00) @db.Decimal(4, 2)
  day_takeoffs         Int      @default(0) @db.UnsignedInt
  day_landings         Int      @default(0) @db.UnsignedInt
  night_takeoffs       Int      @default(0) @db.UnsignedInt
  night_landings       Int      @default(0) @db.UnsignedInt
  holding              Int      @default(0) @db.TinyInt
  approaches           Int      @default(0) @db.UnsignedInt
  dual_given           Decimal  @default(0.00) @db.Decimal(4, 2)
  dual_recieved        Decimal  @default(0.00) @db.Decimal(4, 2)
  route                String   @db.VarChar(300)
  ipc                  Int      @default(0) @db.TinyInt
  checkride            Int      @default(0) @db.TinyInt
  flight_review        Int      @default(0) @db.TinyInt
  user_id              Int      @db.UnsignedInt
  instructor_signature Bytes?   @db.Blob
  instructor_id        Int?     @db.UnsignedInt
  date                 DateTime @db.Date
  */