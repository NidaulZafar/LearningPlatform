export default function Signup() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form method="POST" action="{{ route('register') }}">
                @csrf


                <div className="row mb-3">
                  <label htmlFor="name" className="col-md-4 col-form-label text-md-end">{{__('Name')}}</label>

                  <div className="col-md-6">
                    <input id="name" type="text"
                           className="form-control @error('name') is-invalid @enderror" name="name"
                           value="{{ old('name') }}" required autoComplete="name" autoFocus>

                      @error('name')
                      <span className="invalid-feedback" role="alert">
                                        <strong>{{$message}}</strong>
                                    </span>
                      @enderror
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="email"
                         className="col-md-4 col-form-label text-md-end">{{__('Email Address')}}</label>

                  <div className="col-md-6">
                    <input id="email" type="email"
                           className="form-control @error('email') is-invalid @enderror" name="email"
                           value="{{ old('email') }}" required autoComplete="email">

                      @error('email')
                      <span className="invalid-feedback" role="alert">
                                        <strong>{{$message}}</strong>
                                    </span>
                      @enderror
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="password"
                         className="col-md-4 col-form-label text-md-end">{{__('Password')}}</label>

                  <div className="col-md-6">
                    <input id="password" type="password"
                           className="form-control @error('password') is-invalid @enderror" name="password"
                           required autoComplete="new-password">

                      @error('password')
                      <span className="invalid-feedback" role="alert">
                                        <strong>{{$message}}</strong>
                                    </span>
                      @enderror
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="password-confirm"
                         className="col-md-4 col-form-label text-md-end">{{__('Confirm Password')}}</label>

                  <div className="col-md-6">
                    <input id="password-confirm" type="password" className="form-control"
                           name="password_confirmation" required autoComplete="new-password">
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="phone" className="col-md-4 col-form-label text-md-end">{{__('Phone Number')
                  }}</label>

                  <div className="col-md-6">
                    <input id="phone" type="text"
                           className="form-control @error('phone') is-invalid @enderror"
                           name="phone" value="{{old('phone')}}" autoComplete="phone">
                      @error('phone')
                      <span className="invalid-feedback" role="alert">
                                        <strong>{{$message}}</strong>
                                    </span>
                      @enderror
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-md-4 col-form-label text-md-right">{{__('User Type')}}</label>

                  <div className="col-md-6">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type" id="admin"
                             value="admin" {{old('type') == 'admin' ? 'checked' : ''}}>
                        <label className="form-check-label" htmlFor="admin">
                          {{__('Admin')}}
                        </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type" id="instructor"
                             value="instructor" {{old('type') == 'instructor' ? 'checked' : ''}}>
                        <label className="form-check-label" htmlFor="instructor">
                          {{__('Instructor')}}
                        </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type" id="student"
                             value="student" {{old('type') == 'student' ? 'checked' : ''}}>
                        <label className="form-check-label" htmlFor="student">
                          {{__('Student')}}
                        </label>
                    </div>

                    @error('type')
                    <span className="invalid-feedback" role="alert">
                                        <strong>{{$message}}</strong>
                                    </span>
                    @enderror
                  </div>
                </div>

                <div className="row mb-0">
                  <div className="col-md-6 offset-md-4">
                    <button type="submit" className="btn btn-primary">
                      {{__('Register')}}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

)
}
